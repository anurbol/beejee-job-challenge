<?php

require __DIR__ . '/vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use App\Response;


function serve() : Response {
    
    switch($_SERVER['REQUEST_METHOD']) {

        case 'GET': {

            switch($_GET['collection']) {

                case 'tasks': {
                    $page = $_GET['page'];
                    $orderByColumn = $_GET['orderBy'];
                    $orderByDirection = $_GET['direction'];
                    $tasks = Capsule::table('tasks')
                        ->orderBy($orderByColumn, $orderByDirection)
                        ->paginate(3, ['*'], 'page', $page);
                    return new Response($tasks, []);
                }

                case 'sessions': {
                    $session_key = $_GET['key'];
                    $session = Capsule::table('sessions')
                        ->where('session_key', '=', $session_key)
                        ->first();

                    if (!$session) {
                        return new Response(null, ["Session not found."]);
                    }

                    $user = Capsule::table('users')
                        ->where('id', '=', $session->user_id)
                        ->first();

                    if (!$user) {
                        return new Response(null, ["User not found."]);
                    }
                    
                    return new Response([
                        "username" => $user->username,
                        "is_admin" => $user->is_admin
                    ], []);
                }
                
            }

        }
        
        case 'POST': {

            $request = json_decode(file_get_contents('php://input'));

            switch($request->collection) {
                
                case 'tasks': {
                    $task = $request->payload;
                    $created = Capsule::table('tasks')->insert((array) $task);
                    return new Response($created, []);
                }

                case 'sessions': {
                    $credentials = $request->payload;
                    $username = $credentials->username;
                    $password = $credentials->password;
                    
                    $salt = '2342nsdfnsgkrt@#$!@^@!@#$fsferyh@#$';
                    $hash = hash('sha512', $salt . $password );

                    $user = Capsule::table('users')
                        ->where('username', '=', $username)
                        ->first();

                    if (!$user) {
                        return new Response(null, ["Пользователь не найден."]);
                    }
                    
                    if (substr($hash, 0, 64) != $user->password) {
                        return new Response(null, ["Пароль не подходит."]);
                    }

                    $user_agent_hash = substr(hash('sha512', $_SERVER['HTTP_USER_AGENT'] ), 0, 30);
                    $session_key = generate_string(30);

                    $session_created = Capsule::table('sessions')
                        ->insert([
                            "user_id" => $user->id,
                            "user_agent_hash" => $user_agent_hash,
                            "session_key" => $session_key,
                        ]);

                    if ($session_created) {
                        return new Response([
                            "session_key" => $session_key,
                            "username" => $user->username,
                            "is_admin" => $user->is_admin
                        ], []);
                    } else {
                        return new Response(null, ["Не удалось создать сессию."]);
                    }
                }
            }

        }

        case 'PATCH': {

            $request = json_decode(file_get_contents('php://input'));

            switch($request->collection) {
                
                case 'tasks': {
                    $data = $request->payload;
                    $task = $data->task;
                    $session_key = $data->session_key;

                    $session = Capsule::table('sessions')
                        ->where('session_key', $session_key)    
                        ->first();

                    if (!$session) {
                        return new Response(null, ['В доступе отказано.']);
                    }

                    $task->edited_by_admin = 1;
                    $updated = Capsule::table('tasks')
                        ->where('id', $task->id)
                        ->update((array) $task);
                    return new Response([
                        "updated" => $updated,
                        "task" => $task
                    ], []);
                }

            }
        } 

        case 'DELETE': {

            $request = json_decode(file_get_contents('php://input'));

            switch($request->collection) {
                
                case 'sessions': {
                    $session_key = $request->payload;

                    $deleted = Capsule::table('sessions')
                        ->where('session_key', $session_key)
                        ->delete();

                    return new Response([
                        "logged_out" => (bool) $deleted,
                    ], []);
                }
            }
        }
    }

    return new Response(null, ["Unknown request"]);
}

echo json_encode(serve());

<?php 

namespace App;

use JsonSerializable;

class Response implements JsonSerializable {
    public $errors;
    public $data;

    function __construct($data, array $errors) {
        $this->errors = $errors;
        $this->data = $data;
    }

    public function jsonSerialize() {
        return [
            'errors' => $this->errors,
            'data' => $this->data,
        ];
    }
}

?>
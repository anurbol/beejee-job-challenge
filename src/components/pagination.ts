import { paginationItem } from "./paginationItem.js";
import { state } from "../state.js";

export const pagination = () => `
<nav>
  <ul class="pagination">
    ${state.pagination.items.map(paginationItem).join('')}
  </ul>
</nav>`
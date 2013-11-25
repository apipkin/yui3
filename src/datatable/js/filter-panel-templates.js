Y.namespace('DataTable.PanelFilter').Templates = {
main:  '<h3>{{title}}</h3>
        <form action="#" class="colFilter pure-form">
            {{^hideSort}}
            <div class="sort">
                <dl>
                    <dt>Sort:</dt>
                    <dd>
                        <ul>
                            <li>
                                <button name="sortAZ" class="pure-button pure-link">{{ sortAZ }}</button>
                            </li>
                            <li>
                                <button name="sortZA" class="pure-button pure-link">{{ sortZA }}</button>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </div>
            {{/hideSort}}
            {{^hideFilter}}
            <div class="filter">
                <dl>
                    <dt>Filter:</dt>
                    <dd>
                        <ul>
                            <li>
                                <button name="selectAll" class="pure-button pure-link">{{ selectAll }}</button>
                            </li>
                            <li>
                                <button name="clearAll" class="pure-button pure-link">{{ clearAll }}</button>
                            </li>
                            <li>
                                <button name="toggleSelection" class="pure-button pure-link">{{ toggleSelection }}</button>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <div class="filter-search">
                    <input type="text" name="fiterQ">
                </div>
                <ul class="filter-list">{{#data}}
                    <li data-text="{{this}}">
                        <label>
                            <i class="icon icon-check"><input type="checkbox"></i>
                            {{ this }}
                        </label>
                    </li>
                {{/data}}</ul>
                <div class="buttons">
                    <button name="update" class="pure-button pure-button-primary">Update</button>
                    <button name="close" class="pure-button">Close</button>
                </div>
            </div>
            {{/hideFilter}}
        </form>'
};
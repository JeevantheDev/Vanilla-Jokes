export const StorageCtrl = (function () {
    return {
        storeItems: function (item) {
            let items;

            if(localStorage.getItem('jokes') === null) {
                items = [];
                items.push(item);
                localStorage.setItem('jokes', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('jokes'));
                items.push(item);
                localStorage.setItem('jokes', JSON.stringify(items));
            }
        },
        
        getItems: function() {
            let items;
            if (localStorage.getItem('jokes') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('jokes'));
            }
            return items;
        },

        deleteItems: function(id) {
            let items = JSON.parse(localStorage.getItem('jokes'));

            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('jokes', JSON.stringify(items));
        },

        clearAllItems: function() {
            localStorage.removeItem('jokes');
        }

    }
})();
document.addEventListener('DOMContentLoaded', () => {
    const filterGroups = document.querySelectorAll('[data-filter-group]');

    filterGroups.forEach(group => {
        const filterButtons = group.querySelectorAll('[data-filter]');
        const filterItems = group.querySelectorAll('[data-category]');

        if(filterButtons.length === 0 || filterItems.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                filterItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    item.classList.remove('show-item');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('d-none');
                        setTimeout(() => {
                            item.classList.add('show-item');
                        }, 10);
                    } else {
                        item.classList.add('d-none');
                    }
                });
            });
        });
    });
});
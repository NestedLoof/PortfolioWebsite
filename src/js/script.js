document.addEventListener('DOMContentLoaded', (event) => {
    const filterButtons = document.querySelectorAll('.tag-filter');
    const projectCards = document.querySelectorAll('.project-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.getAttribute('data-tag');
        
        // Update active state of buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        // Filter projects
        projectCards.forEach(card => {
          const cardTags = card.getAttribute('data-tags').split(',');
          if (tag === 'all' || cardTags.includes(tag)) {
            card.classList.remove('hidden');
            console.log('show' + cardTags);
          } else {
            card.classList.add('hidden');
            console.log('hide' + cardTags);
          }
        });
      });
    });
  });
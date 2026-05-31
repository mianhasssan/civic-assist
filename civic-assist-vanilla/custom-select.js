function initCustomSelects() {
  const selects = document.querySelectorAll('.modern-select');
  
  selects.forEach(select => {
    // Prevent double init
    if (select.dataset.customInit) return;
    select.dataset.customInit = "true";
    
    // Hide original
    select.style.display = "none";
    
    // Build custom wrapper
    const wrapper = document.createElement('div');
    wrapper.className = "custom-select-wrapper";
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    
    // Build trigger
    const trigger = document.createElement('div');
    trigger.className = "custom-select-trigger";
    trigger.tabIndex = 0;
    
    const triggerText = document.createElement('span');
    triggerText.textContent = select.options[select.selectedIndex]?.text || "Select...";
    trigger.appendChild(triggerText);
    
    const chevron = document.createElement('span');
    chevron.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
    trigger.appendChild(chevron);
    
    wrapper.appendChild(trigger);
    
    // Build dropdown
    const dropdown = document.createElement('div');
    dropdown.className = "custom-select-dropdown";
    
    // Build search
    const searchContainer = document.createElement('div');
    searchContainer.className = "custom-select-search-container";
    const searchInput = document.createElement('input');
    searchInput.type = "text";
    searchInput.className = "custom-select-search";
    searchInput.placeholder = "Search...";
    searchContainer.appendChild(searchInput);
    dropdown.appendChild(searchContainer);
    
    // Build options list
    const optionsContainer = document.createElement('div');
    optionsContainer.className = "custom-select-options";
    
    const optionDivs = [];
    
    Array.from(select.children).forEach(child => {
      if (child.tagName === "OPTGROUP") {
        const group = document.createElement('div');
        group.className = "custom-select-optgroup";
        group.textContent = child.label;
        optionsContainer.appendChild(group);
        
        Array.from(child.children).forEach(opt => {
          createOptionEl(opt, optionsContainer);
        });
      } else {
        createOptionEl(child, optionsContainer);
      }
    });
    
    function createOptionEl(opt, container) {
      if (opt.value === "") return; // Skip placeholder
      const optDiv = document.createElement('div');
      optDiv.className = "custom-select-option";
      optDiv.textContent = opt.text;
      optDiv.dataset.value = opt.value;
      
      optDiv.addEventListener('click', () => {
        select.value = opt.value;
        triggerText.textContent = opt.text;
        
        // Trigger change event on original select
        const event = new Event('change', { bubbles: true });
        select.dispatchEvent(event);
        
        wrapper.classList.remove('open');
        
        // Update selected class
        optionDivs.forEach(d => d.classList.remove('selected'));
        optDiv.classList.add('selected');
      });
      
      if (select.value === opt.value) {
        optDiv.classList.add('selected');
      }
      
      container.appendChild(optDiv);
      optionDivs.push({ el: optDiv, text: opt.text.toLowerCase() });
    }
    
    dropdown.appendChild(optionsContainer);
    wrapper.appendChild(dropdown);
    
    // Interaction Events
    trigger.addEventListener('click', (e) => {
      // Close other open selects
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        if (w !== wrapper) w.classList.remove('open');
      });
      
      wrapper.classList.toggle('open');
      if (wrapper.classList.contains('open')) {
        searchInput.focus();
        searchInput.value = "";
        optionDivs.forEach(o => o.el.classList.remove('hidden'));
      }
    });
    
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      optionDivs.forEach(opt => {
        if (opt.text.includes(term)) {
          opt.el.classList.remove('hidden');
        } else {
          opt.el.classList.add('hidden');
        }
      });
    });
    
    // Update trigger text if original select changes externally (e.g. form reset)
    select.addEventListener('change', () => {
      triggerText.textContent = select.options[select.selectedIndex]?.text || "Select...";
      optionDivs.forEach(o => {
        if (o.el.dataset.value === select.value) {
          o.el.classList.add('selected');
        } else {
          o.el.classList.remove('selected');
        }
      });
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => w.classList.remove('open'));
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initCustomSelects);

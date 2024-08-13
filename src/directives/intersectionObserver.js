export default {
    mounted(el, binding) {
        setupObserver(el, binding)
    },
    updated(el, binding) {
        el.classList.remove('animate')
        setupObserver(el, binding)
    },
}

function setupObserver(el, binding) {
    const option = binding.value || { threshold: 0.2 }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target)
                const delay = 0.2 * (index + 1)
                el.style.transitionDelay = `${delay}s`
                el.classList.add('animate')
            }
        })
    }, option)

    observer.observe(el)
}

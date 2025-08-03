document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting Mewantra by MewaRam\'s! We will get back to you soon.');
    this.reset();
});
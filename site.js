// Image variant mapping for products with colour swatches
var productVariants = {
    'Love Hoops Dreams Hoodie': {
        white: { front: 'images/products/Love hoops and dreams Hoodie(Front),White.png' },
        black: { front: 'images/products/Love hoops and dreams hoodie (Front).png' }
    },
    'Love Hoops Dreams T-Shirt': {
        white: { front: 'images/products/Love hoops and dreams T-shirt (Front) White.png' },
        black: { front: 'images/products/Love hoops and dreams T-shirt (Front), Black.png' }
    },
    'Love Hoops Dreams Crop Top': {
        white: { front: 'images/products/Love hoops and dreams Crop-Top (Front),White.png', back: 'images/products/Love hoops and dreams Crop-Top (Back),White.png' },
        black: { front: 'images/products/Love hoops and dreams Crop-Top (Front),Black.png', back: 'images/products/Love hoops and dreams Crop-Top (Back),Black.png' }
    }
};

// Handle colour swatches for products with variants
document.querySelectorAll('.product-card').forEach(function (card) {
    var swatches = card.querySelectorAll('.color-swatch');
    if (!swatches.length) return;

    var heading = card.querySelector('h3');
    var productName = heading ? heading.textContent.trim() : '';
    var productVariant = productVariants[productName];
    
    if (!productVariant) {
        // No variants for this product, hide swatches
        card.querySelectorAll('.color-swatch').forEach(function (swatch) {
            swatch.parentElement.style.display = 'none';
        });
        return;
    }

    // Product has variants, set up swatch functionality
    var frontImg = card.querySelector('.jersey-front') || card.querySelector('.product-image');
    var backImg = card.querySelector('.jersey-back');
    var defaultColor = card.dataset.defaultColor || 'black';

    function applyColorVariant(colorName) {
        var variant = productVariant[colorName];
        if (variant && frontImg) {
            frontImg.src = variant.front;
        }
        if (variant && backImg && variant.back) {
            backImg.src = variant.back;
        }
        
        swatches.forEach(function (swatch) {
            var active = swatch.dataset.color === colorName;
            swatch.classList.toggle('is-active', active);
            swatch.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    applyColorVariant(defaultColor);

    swatches.forEach(function (swatch) {
        swatch.addEventListener('click', function () {
            applyColorVariant(swatch.dataset.color);
        });
    });
});

var params = new URLSearchParams(window.location.search);
var collection = document.querySelector('#collection');
var product = document.querySelector('#product');
if (collection && params.has('collection')) collection.value = params.get('collection');
if (product && params.has('product')) product.value = params.get('product');

var enquiryForm = document.querySelector('[data-enquiry-form]');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var confirmation = document.querySelector('[data-form-message]');
        confirmation.textContent = 'Enquiry received. We will get back to you shortly.';
        confirmation.hidden = false;
        enquiryForm.reset();
    });
}

var contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var confirmation = document.querySelector('[data-form-message]');
        confirmation.textContent = 'Message received. The LandLords team will be in touch.';
        confirmation.hidden = false;
        contactForm.reset();
    });
}

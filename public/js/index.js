const popup = document.querySelector('.popup');
const popupList = document.querySelector('.popupList');

let isPopupVisible = false;

popupList.style.display = 'none';

popup.addEventListener('click', () => {
    if (!isPopupVisible) {
        popupList.style.display = 'block';
        isPopupVisible = true;
    } else {
        popupList.style.display = 'none';
        isPopupVisible = false;
    }
});






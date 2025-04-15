const getDOM = (()=>{
    const $ = el=> document.querySelector(el);
    const $$ = el => document.getElementById(el);

    const form  = $('.header__form');
    const listRecent = $$('list-recent');
    const containerResult = $$('container-result');
    const previewBTN = $$('preview');
    const nextBTN = $$('next');
    const containerSlider = $('.sliders');
    const main = $$('main');
    const loaderRecent = $('.loader-recent');
    const loaderGrid = $('.loader-grid');

    return {listRecent,containerResult,previewBTN,nextBTN, form,containerSlider,main,loaderRecent,loaderGrid};

})();

export default getDOM;
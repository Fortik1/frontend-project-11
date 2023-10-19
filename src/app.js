import checkValidUrl from "./script/checkValidUrl.js";
import view from "./script/view.js";

export default () => {
    const form = document.querySelector('form');

    const state = {
        useUrl: [],
        error: '',
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = formData.get('url').trim();

        console.log(checkValidUrl({ website: url }))
    });
}

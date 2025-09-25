import Dashboard from "./views/Dashboard.js";
import Calculator from "./views/Calculator.js";

const navigateTo = url => {
    history.pushState(null, null,  url);
    router()
}

const router = async () => {
    const routes = [
        {path: "/", view: Dashboard},
        {path: "/calculator", view:  Calculator}
    ];

    const potentialMatch = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatch.find(match => match.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view()

    // Call the AbstractView methods
    document.querySelector("#app").innerHTML = await view.getHtml()
    
    if (typeof view.onMounted === "function") {
        await view.onMounted();
    }

    // console.log(match.route.view());
};

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    
    router();
});
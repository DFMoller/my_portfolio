function mobile() {
    console.log("Screen Changed");
    if (window.innerWidth > 1080) {
        const buttons = document.querySelectorAll(".project-button");
        buttons.forEach((button) => {
            const targetClass = button.dataset.target;
            const target = document.querySelector(`.${targetClass}`);
            button.addEventListener('click', function() {
                
                // Make project visible
                target.classList.remove("hidden");

                // Scroll to top of project
                document.querySelector("html").scrollTop = 0;
                    // console.log(`${targetClass} offset: ${target.offsetTop}`);
                    // target.scrollIntoView;

                // Close other projects
                buttons.forEach((innerButton) => {
                    if (innerButton.dataset.target != targetClass) {
                        document.querySelector(`.${innerButton.dataset.target}`).classList.add("hidden");
                        // Remove button style
                        innerButton.classList.remove("button-selected");
                    }
                })
                // Add button style
                button.classList.add("button-selected");

                // Ensure menu does not go away even if screen-size changes
                document.querySelector("nav").classList.remove("slide-down");
            })

        })
    } else {
        const buttons = document.querySelectorAll(".project-button");
        buttons.forEach((button) => {
            const targetClass = button.dataset.target;
            const target = document.querySelector(`.${targetClass}`);
            button.addEventListener('click', function() {
                // Make project visible
                target.classList.remove("hidden");

                // Scroll to top of target
                document.querySelector("html").scrollTop = 0;

                // Close other projects
                buttons.forEach((innerButton) => {
                    if (innerButton.dataset.target != targetClass) {
                        document.querySelector(`.${innerButton.dataset.target}`).classList.add("hidden");
                        // Remove button style
                        innerButton.classList.remove("button-selected");
                    }
                })
                // Make menu go away
                document.querySelector("nav").classList.add("slide-down");

                // Ensure buttons dont animate even if screen-size changes
                button.classList.remove("button-selected");

            })

        })
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    const mobileHead = document.querySelector(".mobile-head");
    
    window.onresize = mobile();
    mobile();

    mobileHead.addEventListener("click", function () {
        document.querySelector("nav").classList.remove("slide-down");
    })

    var url_string = window.location.href;
    var url = new URL(url_string);
    var dest = url.searchParams.get("dest");
    if(dest)
    {
        const auto_btn = document.getElementById(dest+"_btn");
        auto_btn.click();
    }

})
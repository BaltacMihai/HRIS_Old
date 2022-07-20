import { useEffect } from "react";
/**
 * Change the current element in the navbar
 * @param {string} currentPage the id for the navbar item ( page name)

 */
export default function useNavbarOption(currentPage) {
  useEffect(() => {
    const lastActive = document.getElementsByClassName(
      "navbar_options_option-active"
    );
    for (let i = 0; i < lastActive.length; i++)
      lastActive[i].classList.remove("navbar_options_option-active");

    const active = document.getElementById(currentPage);

    active.classList.add("navbar_options_option-active");
  });
}

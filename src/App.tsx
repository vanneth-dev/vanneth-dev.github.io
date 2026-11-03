// import { useEffect } from "react";
// import "./styles.css";
// import "./pretty-checkbox.scss";
// import "./shared/utils/i18n";
// import RouterApp from "./router";
// import { initGtag } from "src/shared/utils/gtag";
// import { initHotjar } from "src/shared/utils/hotjar";
// import { visitorNotificationService } from "src/shared/services/visitor-notification.service";

// function App() {
//   useEffect(() => {
//     if (import.meta.env.VITE_NODE_ENV === "production") {
//       initGtag();
//       initHotjar();

//       void visitorNotificationService.notify();
//     }
//   }, []);

//   return <RouterApp />;
// }

// export default App;

import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.replace("https://vannethtak.github.io/");
  }, []);

  return null;
}

export default App;

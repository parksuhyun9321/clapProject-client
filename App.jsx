// import { BrowserRouter, RouterProvider } from "react-router-dom";
// import UseRoute from "./hook/useRoute";
import { RouterProvider } from "react-router-dom";
import Router from "./AppRouter";



const App = () => {  

  return (
      // <BrowserRouter>        
      //   <RouterProvider router={Router} />
      //   {/* <UseRoute/> */}
      // </BrowserRouter>
      <RouterProvider 
        router={Router} 
        
        future={{
          v7_startTransition : true,
        }}
      />
  );
}

export default App;

  import 'react-toastify/dist/ReactToastify.css';
  
  export class Toast {
      static getToastOptions() {
        return {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
      }
  }
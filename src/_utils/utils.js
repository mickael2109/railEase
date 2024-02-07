import Swal from 'sweetalert2';

// Utils error
let errorPage = (textError) => {
    Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: textError,
    });
}

// Utils error
let sucess = (textSuccess) => {
    Swal.fire({ icon: 'success', title: 'Message succès', text: textSuccess, });

}

let PageNotFound = () =>{
    return(
        <div>
            404 Page Not Found
        </div>
    )
}


export const Utils = {
    errorPage, sucess, PageNotFound
}
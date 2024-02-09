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

// Logout
let Logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
};

// Verify token
let verifyToken = () => {
    const tokens = localStorage.getItem('token');
    if(!tokens){
        Swal.fire({
            title: `Token manquante, Vous devez reconnecter`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText:  `Reconnectée`,
            denyButtonText: "Annuler",
            allowEscapeKey: false,
            allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) { 
                    Utils.Logout()
                }else{             
                    Utils.Logout()
                }
        });
    }
}

export const Utils = {
    errorPage, sucess, PageNotFound, Logout, verifyToken
}
export function toast(status, msg) {
    const body = document.querySelector('body')
    const toast = document.createElement('div')
    const message = document.createElement('p')
    
    message.innerText = msg

    if (status == 'success') {
        toast.classList = 'toast-success'
    } else {
        toast.classList = 'toast-error'
    }

    toast.append(message)
    body.append(toast)

    setTimeout(() => {
        toast.remove()
    }, 1500)
}
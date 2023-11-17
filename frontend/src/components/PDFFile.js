export const PDFFile = () => {
    window.onload = function () {
        document.getElementById("download")
            .addEventListener("click", () => {
                const invoice = this.document.getElementById("invoice");
                console.log(invoice)
                console.log(window)
                let PDFWidth = 1800
                let PDFHeight = 1600
                let opt = {
                    margin: 1,
                    filename: 'OrderHistory.pdf',
                    //Image Type
                    image: {type: 'jpg', quality: 0.3},
                    //useCORS is to allow to access the outside API
                    html2canvas: {useCORS: true, scale: 1},
                    // allowTaint: true,
                    jsPDF: {unit: 'px', format: [PDFWidth, PDFHeight], orientation: 'portrait'}
                };
                window.html2pdf().set(opt).from(invoice).save();

            })
    }
}

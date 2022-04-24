export default function formatarNumero(valor) {
    return (Number(valor) / 100).toFixed(2).replace('.',',')
}
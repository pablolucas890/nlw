export function convertDurationToTimeString(duration: number): string {

    const hours = Math.floor(duration / 3600); // Arredonda para baixo
    const minutes = Math.floor((duration % 3600) / 60);
    const seconnds = duration % 60;

    const finalResult = [hours, minutes, seconnds].map(unit => String(unit).padStart(2, '0')).join(':');

    return finalResult;
}
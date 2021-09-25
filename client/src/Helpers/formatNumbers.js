// count will be formatted 
export const formatCount = count => {
    if (count < 1e3) return count;
    if (count >= 1e3 && count < 1e6) return +(count / 1e3).toFixed(1);
    if (count >= 1e6 && count < 1e9) return +(count / 1e6).toFixed(1);
    if (count >= 1e9 && count < 1e12) return +(count / 1e9).toFixed(1);
    if (count >= 1e12) return +(count / 1e12).toFixed(1);
};

// si stands for International System of Units
export const formatSi = count => {
    if (count < 1e3) return "";
    if (count >= 1e3 && count < 1e6) return "K";
    if (count >= 1e6 && count < 1e9) return "M";
    if (count >= 1e9 && count < 1e12) return "B";
    if (count >= 1e12) return "T";
};
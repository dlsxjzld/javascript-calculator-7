export const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&은 일치한 문자열 전체를 의미

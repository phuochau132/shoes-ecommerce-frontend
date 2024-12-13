interface CurrencyRatesType {
  [key: string]: number;
}
interface CurrenciesFormatType {
  [key: string]: object;
}

export var Currency = {
  rates: {
    USD: 1,
    EUR: 1.05709,
    GBP: 1.27436,
    CAD: 0.706705,
    ARS: 98801e-8,
    AUD: 0.638984,
    BRL: 0.164202,
    CLP: 0.00102526,
    CNY: 0.137552,
    CYP: 0.397899,
    CZK: 0.0421188,
    DKK: 0.141727,
    EEK: 0.0706676,
    HKD: 0.128524,
    HUF: 0.00255485,
    ISK: 0.00725599,
    INR: 0.0118149,
    JMD: 0.00637443,
    JPY: 0.00666728,
    LVL: 1.57329,
    LTL: 0.320236,
    MTL: 0.293496,
    MXN: 0.0495427,
    NZD: 0.583026,
    NOK: 0.089654,
    PLN: 0.24775,
    SGD: 0.74498,
    SKK: 21.5517,
    SIT: 175.439,
    ZAR: 0.0554837,
    KRW: 701948e-9,
    SEK: 0.0914595,
    CHF: 1.13693,
    TWD: 0.0308485,
    UYU: 0.0231631,
    MYR: 0.226293,
    BSD: 1,
    CRC: 0.00197126,
    RON: 0.212607,
    PHP: 0.0172792,
    AED: 0.272294,
    VEB: 205428e-15,
    IDR: 630224e-10,
    TRY: 0.0287876,
    THB: 0.0293556,
    TTD: 0.14774,
    ILS: 0.279235,
    SYP: 769116e-10,
    XCD: 0.369662,
    COP: 226839e-9,
    RUB: 0.00995339,
    HRK: 0.1403,
    KZT: 0.00196831,
    TZS: 381561e-9,
    XPT: 931.149,
    SAR: 0.266667,
    NIO: 0.0271993,
    LAK: 457005e-10,
    OMR: 2.59754,
    AMD: 0.00249292,
    CDF: 350086e-9,
    KPW: 0.00111104,
    SPL: 6,
    KES: 0.00771039,
    ZWD: 0.00276319,
    KHR: 248037e-9,
    MVR: 0.0647142,
    GTQ: 0.129645,
    BZD: 0.494535,
    BYR: 305497e-10,
    LYD: 0.204986,
    DZD: 0.00748722,
    BIF: 34245e-8,
    GIP: 1.27436,
    BOB: 0.144567,
    XOF: 0.00161153,
    STD: 429876e-10,
    NGN: 632323e-9,
    PGK: 0.251969,
    ERN: 0.0666667,
    MWK: 576038e-9,
    CUP: 0.0416749,
    GMD: 0.0139405,
    CVE: 0.00958639,
    BTN: 0.0118149,
    XAF: 0.00161153,
    UGX: 271577e-9,
    MAD: 0.100034,
    MNT: 29208e-8,
    LSL: 0.0554837,
    XAG: 30.9749,
    TOP: 0.421445,
    SHP: 1.27436,
    RSD: 0.00903604,
    HTG: 0.00759848,
    MGA: 213239e-9,
    MZN: 0.0157099,
    FKP: 1.27436,
    BWP: 0.0733443,
    HNL: 0.0395375,
    PYG: 127809e-9,
    JEP: 1.27436,
    EGP: 0.0200192,
    LBP: 111674e-10,
    ANG: 0.556492,
    WST: 0.359538,
    TVD: 0.638984,
    GYD: 0.00478076,
    GGP: 1.27436,
    NPR: 0.00738088,
    KMF: 0.0021487,
    IRR: 237687e-10,
    XPD: 960,
    SRD: 0.0282805,
    TMM: 571951e-10,
    SZL: 0.0554837,
    MOP: 0.12478,
    BMD: 1,
    XPF: 0.00885843,
    ETB: 0.00799898,
    JOD: 1.41044,
    MDL: 0.0546307,
    MRO: 0.00251617,
    YER: 0.00399558,
    BAM: 0.540482,
    AWG: 0.558659,
    PEN: 0.268427,
    VEF: 205288e-12,
    SLL: 43896e-9,
    KYD: 1.2094,
    AOA: 0.00109531,
    TND: 0.317997,
    TJS: 0.0917351,
    SCR: 0.0699411,
    LKR: 0.00344428,
    DJF: 0.00561177,
    GNF: 116047e-9,
    VUV: 0.00819985,
    SDG: 0.00166375,
    IMP: 1.27436,
    GEL: 0.354424,
    FJD: 0.437752,
    DOP: 0.0165594,
    XDR: 1.31773,
    MUR: 0.0214835,
    MMK: 476412e-9,
    LRD: 0.00557108,
    BBD: 0.5,
    ZMK: 369081e-10,
    XAU: 2632.94,
    VND: 393997e-10,
    UAH: 0.0239866,
    TMT: 0.285976,
    IQD: 763131e-9,
    BGN: 0.540482,
    KGS: 0.0115208,
    RWF: 725125e-9,
    BHD: 2.65957,
    UZS: 778918e-10,
    PKR: 0.00359766,
    MKD: 0.0171943,
    AFN: 0.0145203,
    NAD: 0.0554837,
    BDT: 0.00835713,
    AZN: 0.588235,
    SOS: 0.00175133,
    QAR: 0.274725,
    PAB: 1,
    CUC: 1,
    SVC: 0.114286,
    SBD: 0.119316,
    ALL: 0.010716,
    BND: 0.74498,
    KWD: 3.25227,
    GHS: 0.0673233,
    ZMW: 0.0369081,
    XBT: 98748.4,
    NTD: 0.0337206,
    BYN: 0.305497,
    CNH: 0.137429,
    MRU: 0.0251617,
    STN: 0.0429876,
    VES: 0.0205288,
    MXV: 0.413159,
    VED: 0.0205288,
    SLE: 0.043896
  } as CurrencyRatesType,
  moneyFormats: {
    USD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} USD' },
    EUR: { money_format: '€{{amount}}', money_with_currency_format: '€{{amount}} EUR' },
    GBP: { money_format: '£{{amount}}', money_with_currency_format: '${{amount}} GBP' },
    CAD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} CAD' },
    ALL: { money_format: 'Lek {{amount}}', money_with_currency_format: 'Lek {{amount}} ALL' },
    DZD: { money_format: 'DA {{amount}}', money_with_currency_format: 'DA {{amount}} DZD' },
    AOA: { money_format: 'Kz{{amount}}', money_with_currency_format: 'Kz{{amount}} AOA' },
    ARS: {
      money_format: '${{amount}}',
      money_with_currency_format: '${{amount}} ARS'
    },
    AMD: { money_format: '{{amount}} AMD', money_with_currency_format: '{{amount}} AMD' },
    AWG: { money_format: 'Afl{{amount}}', money_with_currency_format: 'Afl{{amount}} AWG' },
    AUD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} AUD' },
    BBD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} Bds' },
    AZN: { money_format: 'm.{{amount}}', money_with_currency_format: 'm.{{amount}} AZN' },
    BDT: { money_format: 'Tk {{amount}}', money_with_currency_format: 'Tk {{amount}} BDT' },
    BSD: { money_format: 'BS${{amount}}', money_with_currency_format: 'BS${{amount}} BSD' },
    BHD: { money_format: '{{amount}}0 BD', money_with_currency_format: '{{amount}}0 BHD' },
    BYR: { money_format: 'Br {{amount}}', money_with_currency_format: 'Br {{amount}} BYR' },
    BZD: { money_format: 'BZ${{amount}}', money_with_currency_format: 'BZ${{amount}} BZD' },
    BTN: { money_format: 'Nu {{amount}}', money_with_currency_format: 'Nu {{amount}} BTN' },
    BAM: {
      money_format: 'KM {{amount}}',
      money_with_currency_format: 'KM {{amount}} BAM'
    },
    BRL: {
      money_format: 'R$ {{amount}}',
      money_with_currency_format: 'R$ {{amount}} BRL'
    },
    BOB: {
      money_format: 'Bs{{amount}}',
      money_with_currency_format: 'Bs{{amount}} BOB'
    },
    BWP: { money_format: 'P{{amount}}', money_with_currency_format: 'P{{amount}} BWP' },
    BND: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} BND' },
    BGN: { money_format: '{{amount}} лв', money_with_currency_format: '{{amount}} лв BGN' },
    MMK: { money_format: 'K{{amount}}', money_with_currency_format: 'K{{amount}} MMK' },
    KHR: { money_format: 'KHR{{amount}}', money_with_currency_format: 'KHR{{amount}}' },
    KYD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} KYD' },
    XAF: { money_format: 'FCFA{{amount}}', money_with_currency_format: 'FCFA{{amount}} XAF' },
    CLP: { money_format: '${{amount_no_decimals}}', money_with_currency_format: '${{amount_no_decimals}} CLP' },
    CNY: { money_format: '&#165;{{amount}}', money_with_currency_format: '&#165;{{amount}} CNY' },
    COP: {
      money_format: '${{amount}}',
      money_with_currency_format: '${{amount}} COP'
    },
    CRC: {
      money_format: '&#8353; {{amount}}',
      money_with_currency_format: '&#8353; {{amount}} CRC'
    },
    HRK: {
      money_format: '{{amount}} kn',
      money_with_currency_format: '{{amount}} kn HRK'
    },
    CZK: {
      money_format: '{{amount}} K&#269;',
      money_with_currency_format: '{{amount}} K&#269;'
    },
    DKK: {
      money_format: '{{amount}}',
      money_with_currency_format: 'kr.{{amount}}'
    },
    DOP: { money_format: 'RD$ {{amount}}', money_with_currency_format: 'RD$ {{amount}}' },
    XCD: { money_format: '${{amount}}', money_with_currency_format: 'EC${{amount}}' },
    EGP: { money_format: 'LE {{amount}}', money_with_currency_format: 'LE {{amount}} EGP' },
    ETB: { money_format: 'Br{{amount}}', money_with_currency_format: 'Br{{amount}} ETB' },
    XPF: {
      money_format: '{{amount_no_decimals_with_comma_separator}} XPF',
      money_with_currency_format: '{{amount_no_decimals_with_comma_separator}} XPF'
    },
    FJD: { money_format: '${{amount}}', money_with_currency_format: 'FJ${{amount}}' },
    GMD: { money_format: 'D {{amount}}', money_with_currency_format: 'D {{amount}} GMD' },
    GHS: { money_format: 'GH&#8373;{{amount}}', money_with_currency_format: 'GH&#8373;{{amount}}' },
    GTQ: { money_format: 'Q{{amount}}', money_with_currency_format: '{{amount}} GTQ' },
    GYD: { money_format: 'G${{amount}}', money_with_currency_format: '${{amount}} GYD' },
    GEL: { money_format: '{{amount}} GEL', money_with_currency_format: '{{amount}} GEL' },
    HNL: { money_format: 'L {{amount}}', money_with_currency_format: 'L {{amount}} HNL' },
    HKD: { money_format: '${{amount}}', money_with_currency_format: 'HK${{amount}}' },
    HUF: {
      money_format: '{{amount_no_decimals_with_comma_separator}}',
      money_with_currency_format: '{{amount_no_decimals_with_comma_separator}} Ft'
    },
    ISK: { money_format: '{{amount_no_decimals}} kr', money_with_currency_format: '{{amount_no_decimals}} kr ISK' },
    INR: { money_format: 'Rs. {{amount}}', money_with_currency_format: 'Rs. {{amount}}' },
    IDR: {
      money_format: '{{amount}}',
      money_with_currency_format: 'Rp {{amount}}'
    },
    ILS: { money_format: '{{amount}} NIS', money_with_currency_format: '{{amount}} NIS' },
    JMD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} JMD' },
    JPY: {
      money_format: '&#165;{{amount_no_decimals}}',
      money_with_currency_format: '&#165;{{amount_no_decimals}} JPY'
    },
    JEP: { money_format: '&pound;{{amount}}', money_with_currency_format: '&pound;{{amount}} JEP' },
    JOD: { money_format: '{{amount}}0 JD', money_with_currency_format: '{{amount}}0 JOD' },
    KZT: { money_format: '{{amount}} KZT', money_with_currency_format: '{{amount}} KZT' },
    KES: { money_format: 'KSh{{amount}}', money_with_currency_format: 'KSh{{amount}}' },
    KWD: { money_format: '{{amount}}0 KD', money_with_currency_format: '{{amount}}0 KWD' },
    KGS: { money_format: 'лв{{amount}}', money_with_currency_format: 'лв{{amount}}' },
    LVL: { money_format: 'Ls {{amount}}', money_with_currency_format: 'Ls {{amount}} LVL' },
    LBP: { money_format: 'L&pound;{{amount}}', money_with_currency_format: 'L&pound;{{amount}} LBP' },
    LTL: { money_format: '{{amount}} Lt', money_with_currency_format: '{{amount}} Lt' },
    MGA: { money_format: 'Ar {{amount}}', money_with_currency_format: 'Ar {{amount}} MGA' },
    MKD: { money_format: 'ден {{amount}}', money_with_currency_format: 'ден {{amount}} MKD' },
    MOP: { money_format: 'MOP${{amount}}', money_with_currency_format: 'MOP${{amount}}' },
    MVR: { money_format: 'Rf{{amount}}', money_with_currency_format: 'Rf{{amount}} MRf' },
    MXN: { money_format: '$ {{amount}}', money_with_currency_format: '$ {{amount}} MXN' },
    MYR: { money_format: 'RM{{amount}} MYR', money_with_currency_format: 'RM{{amount}} MYR' },
    MUR: { money_format: 'Rs {{amount}}', money_with_currency_format: 'Rs {{amount}} MUR' },
    MDL: { money_format: '{{amount}} MDL', money_with_currency_format: '{{amount}} MDL' },
    MAD: { money_format: '{{amount}} dh', money_with_currency_format: 'Dh {{amount}} MAD' },
    MNT: { money_format: '{{amount_no_decimals}} &#8366', money_with_currency_format: '{{amount_no_decimals}} MNT' },
    MZN: { money_format: '{{amount}} Mt', money_with_currency_format: 'Mt {{amount}} MZN' },
    NAD: { money_format: 'N${{amount}}', money_with_currency_format: 'N${{amount}} NAD' },
    NPR: { money_format: 'Rs{{amount}}', money_with_currency_format: 'Rs{{amount}} NPR' },
    ANG: { money_format: '&fnof;{{amount}}', money_with_currency_format: '{{amount}} NA&fnof;' },
    NZD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} NZD' },
    NIO: { money_format: 'C${{amount}}', money_with_currency_format: 'C${{amount}} NIO' },
    NGN: { money_format: '&#8358;{{amount}}', money_with_currency_format: '&#8358;{{amount}} NGN' },
    NOK: {
      money_format: 'kr {{amount}}',
      money_with_currency_format: 'kr {{amount}} NOK'
    },
    OMR: {
      money_format: '{{amount}} OMR',
      money_with_currency_format: '{{amount}} OMR'
    },
    PKR: { money_format: 'Rs.{{amount}}', money_with_currency_format: 'Rs.{{amount}} PKR' },
    PGK: { money_format: 'K {{amount}}', money_with_currency_format: 'K {{amount}} PGK' },
    PYG: {
      money_format: 'Gs. {{amount_no_decimals_with_comma_separator}}',
      money_with_currency_format: 'Gs. {{amount_no_decimals_with_comma_separator}} PYG'
    },
    PEN: { money_format: 'S/. {{amount}}', money_with_currency_format: 'S/. {{amount}} PEN' },
    PHP: { money_format: '&#8369;{{amount}}', money_with_currency_format: '&#8369;{{amount}} PHP' },
    PLN: {
      money_format: '{{amount}} zl',
      money_with_currency_format: '{{amount}} zl PLN'
    },
    QAR: {
      money_format: 'QAR {{amount}}',
      money_with_currency_format: 'QAR {{amount}}'
    },
    RON: {
      money_format: '{{amount}} lei',
      money_with_currency_format: '{{amount}} lei RON'
    },
    RUB: {
      money_format: '&#1088;&#1091;&#1073;{{amount}}',
      money_with_currency_format: '&#1088;&#1091;&#1073;{{amount}} RUB'
    },
    RWF: { money_format: '{{amount_no_decimals}} RF', money_with_currency_format: '{{amount_no_decimals}} RWF' },
    WST: { money_format: 'WS$ {{amount}}', money_with_currency_format: 'WS$ {{amount}} WST' },
    SAR: { money_format: '{{amount}} SR', money_with_currency_format: '{{amount}} SAR' },
    STD: { money_format: 'Db {{amount}}', money_with_currency_format: 'Db {{amount}} STD' },
    RSD: { money_format: '{{amount}} RSD', money_with_currency_format: '{{amount}} RSD' },
    SCR: { money_format: 'Rs {{amount}}', money_with_currency_format: 'Rs {{amount}} SCR' },
    SGD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} SGD' },
    SYP: { money_format: 'S&pound;{{amount}}', money_with_currency_format: 'S&pound;{{amount}} SYP' },
    ZAR: { money_format: 'R {{amount}}', money_with_currency_format: 'R {{amount}} ZAR' },
    KRW: {
      money_format: '&#8361;{{amount_no_decimals}}',
      money_with_currency_format: '&#8361;{{amount_no_decimals}} KRW'
    },
    LKR: { money_format: 'Rs {{amount}}', money_with_currency_format: 'Rs {{amount}} LKR' },
    SEK: { money_format: '{{amount_no_decimals}} kr', money_with_currency_format: '{{amount_no_decimals}} kr SEK' },
    CHF: { money_format: 'SFr. {{amount}}', money_with_currency_format: 'SFr. {{amount}} CHF' },
    TWD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} TWD' },
    THB: { money_format: '{{amount}} &#xe3f;', money_with_currency_format: '{{amount}} &#xe3f; THB' },
    TZS: { money_format: '{{amount}} TZS', money_with_currency_format: '{{amount}} TZS' },
    TTD: { money_format: '${{amount}}', money_with_currency_format: '${{amount}} TTD' },
    TND: { money_format: '{{amount}}', money_with_currency_format: '{{amount}} DT' },
    TRY: { money_format: '{{amount}}TL', money_with_currency_format: '{{amount}}TL' },
    UGX: { money_format: 'Ush {{amount_no_decimals}}', money_with_currency_format: 'Ush {{amount_no_decimals}} UGX' },
    UAH: { money_format: '₴{{amount}}', money_with_currency_format: '₴{{amount}} UAH' },
    AED: { money_format: 'Dhs. {{amount}}', money_with_currency_format: 'Dhs. {{amount}} AED' },
    UYU: {
      money_format: '${{amount}}',
      money_with_currency_format: '${{amount}} UYU'
    },
    VUV: { money_format: '${{amount}}', money_with_currency_format: '${{amount}}VT' },
    VEF: {
      money_format: 'Bs. {{amount}}',
      money_with_currency_format: 'Bs. {{amount}} VEF'
    },
    VND: {
      money_format: '{{amount}}VND'
    },
    XBT: { money_format: '{{amount_no_decimals}} BTC', money_with_currency_format: '{{amount_no_decimals}} BTC' },
    XOF: { money_format: 'CFA{{amount}}', money_with_currency_format: 'CFA{{amount}} XOF' },
    ZMW: {
      money_format: 'K{{amount_no_decimals_with_comma_separator}}',
      money_with_currency_format: 'ZMW{{amount_no_decimals_with_comma_separator}}'
    }
  } as CurrenciesFormatType,
  convert: function (amount: number, from: string, to: string) {
    return (amount * this.rates[from]) / this.rates[to];
  },
  formatNumber: function (number: number, decimalPlaces: number = 2) {
    const numberString = number.toFixed(decimalPlaces);
    const [integerPart, decimalPart] = numberString.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedIntegerPart + ',' + decimalPart;
  },
  convertAll: function (query: string = '.money', from: string, to: string): void {
    const moneyElements = document.querySelectorAll(query);
    const currencyConverter = this;

    if (moneyElements) {
      moneyElements.forEach(function (item) {
        const element = item as HTMLElement;
        if (element.dataset.currencyValue) {
          const currencyValue = parseInt(element.dataset.currencyValue);
          const formatString = currencyConverter.moneyFormats[to].money_format;

          const newPrice = currencyConverter.convert(currencyValue, from, to);
          const decimalPrice = currencyConverter.formatNumber(newPrice, 2);
          const formattedPrice = formatString.replace('{{amount}}', decimalPrice);
          element.textContent = formattedPrice;
        }
      });
    }
  },
  initializeCurrency: function () {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'USD');
    }
    const event = new Event('click');
    document.querySelector(`[data-currency=${localStorage.getItem('currency') || 'USD'}]`)?.dispatchEvent(event);
  }
};

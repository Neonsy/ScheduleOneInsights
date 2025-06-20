import type { TransformationRules } from '@/code/types/mixing/TransformationRule';

export const transformationRules: TransformationRules = {
    // Addy
    AD: [
        { ifPresent: ['EPS'], ifNotPresent: ['EPI'], replace: { EPS: 'EPI' } },
        { ifPresent: ['FG'], ifNotPresent: ['EEGI'], replace: { FG: 'EEGI' } },
        { ifPresent: ['GI'], ifNotPresent: ['RFI'], replace: { GI: 'RFI' } },
        { ifPresent: ['LF'], ifNotPresent: ['ELTFI'], replace: { LF: 'ELTFI' } },
        { ifPresent: ['SDT'], ifNotPresent: ['GGIT'], replace: { SDT: 'GGIT' } },
    ],

    // Banana
    BNN: [
        { ifPresent: ['CI'], ifNotPresent: ['SY'], replace: { CI: 'SY' } },
        { ifPresent: ['CCPA'], ifNotPresent: ['EEGI'], replace: { CCPA: 'EEGI' } },
        { ifPresent: ['DOIET'], ifNotPresent: ['FCE'], replace: { DOIET: 'FCE' } },
        { ifPresent: ['EEGI'], ifNotPresent: ['TP'], replace: { EEGI: 'TP' } },
        { ifPresent: ['FCE'], ifNotPresent: ['SUIDI'], replace: { FCE: 'SUIDI' } },
        { ifPresent: ['LF'], ifNotPresent: ['RFI'], replace: { LF: 'RFI' } },
        { ifPresent: ['PANA'], ifNotPresent: ['JNII'], replace: { PANA: 'JNII' } },
        { ifPresent: ['SL'], ifNotPresent: ['AG'], replace: { SL: 'AG' } },
        { ifPresent: ['TI'], ifNotPresent: ['SL'], replace: { TI: 'SL' } },
    ],

    // Battery
    BTY: [
        { ifPresent: ['CCPA'], ifNotPresent: ['GI'], replace: { CCPA: 'GI' } },
        { ifPresent: ['ELTFI'], ifNotPresent: ['EPI'], replace: { ELTFI: 'EPI' } },
        { ifPresent: ['EPI'], ifNotPresent: ['ZBFI'], replace: { EPI: 'ZBFI' } },
        { ifPresent: ['LAT'], ifNotPresent: ['CD'], replace: { LAT: 'CD' } },
        { ifPresent: ['MC'], ifNotPresent: ['TT'], replace: { MC: 'TT' } },
        { ifPresent: ['SI'], ifNotPresent: ['MC'], replace: { SI: 'MC' } },
    ],

    // Cuke
    C: [
        { ifPresent: ['EPI'], ifNotPresent: ['LAT'], replace: { EPI: 'LAT' } },
        { ifPresent: ['FG'], ifNotPresent: ['CCPA'], replace: { FG: 'CCPA' } },
        { ifPresent: ['GGIT'], ifNotPresent: ['TP'], replace: { GGIT: 'TP' } },
        { ifPresent: ['MC'], ifNotPresent: ['ALI'], replace: { MC: 'ALI' } },
        { ifPresent: ['SPY'], ifNotPresent: ['MC'], replace: { SPY: 'MC' } },
        { ifPresent: ['SY'], ifNotPresent: ['PANA'], replace: { SY: 'PANA' } },
        { ifPresent: ['TI'], ifNotPresent: ['EPI'], replace: { TI: 'EPI' } },
    ],

    // Chili
    CL: [
        { ifPresent: ['AG'], ifNotPresent: ['TT'], replace: { AG: 'TT' } },
        { ifPresent: ['ALI'], ifNotPresent: ['EPI'], replace: { ALI: 'EPI' } },
        { ifPresent: ['LAT'], ifNotPresent: ['LF'], replace: { LAT: 'LF' } },
        { ifPresent: ['MC'], ifNotPresent: ['TI'], replace: { MC: 'TI' } },
        { ifPresent: ['SI'], ifNotPresent: ['RFI'], replace: { SI: 'RFI' } },
        { ifPresent: ['SY'], ifNotPresent: ['BE'], replace: { SY: 'BE' } },
    ],

    // Donut
    DN: [
        { ifPresent: ['AG'], ifNotPresent: ['SPY'], replace: { AG: 'SPY' } },
        { ifPresent: ['BI'], ifNotPresent: ['SY'], replace: { BI: 'SY' } },
        { ifPresent: ['CD'], ifNotPresent: ['EPS'], replace: { CD: 'EPS' } },
        { ifPresent: ['FCE'], ifNotPresent: ['EPI'], replace: { FCE: 'EPI' } },
        { ifPresent: ['JNII'], ifNotPresent: ['GGIT'], replace: { JNII: 'GGIT' } },
        { ifPresent: ['MC'], ifNotPresent: ['CI'], replace: { MC: 'CI' } },
        { ifPresent: ['SI'], ifNotPresent: ['EEGI'], replace: { SI: 'EEGI' } },
    ],

    // Energy Drink
    ED: [
        { ifPresent: ['DOIET'], ifNotPresent: ['ELTFI'], replace: { DOIET: 'ELTFI' } },
        { ifPresent: ['EPI'], ifNotPresent: ['EEGI'], replace: { EPI: 'EEGI' } },
        { ifPresent: ['FCE'], ifNotPresent: ['SI'], replace: { FCE: 'SI' } },
        { ifPresent: ['GI'], ifNotPresent: ['DOIET'], replace: { GI: 'DOIET' } },
        { ifPresent: ['SZPN'], ifNotPresent: ['BI'], replace: { SZPN: 'BI' } },
        { ifPresent: ['SDT'], ifNotPresent: ['MC'], replace: { SDT: 'MC' } },
        { ifPresent: ['SC'], ifNotPresent: ['EPI'], replace: { SC: 'EPI' } },
        { ifPresent: ['TT'], ifNotPresent: ['SY'], replace: { TT: 'SY' } },
    ],

    // Flu Medicine
    FM: [
        { ifPresent: ['ALI'], ifNotPresent: ['MC'], replace: { ALI: 'MC' } },
        { ifPresent: ['LAT'], ifNotPresent: ['EPI'], replace: { LAT: 'EPI' } },
        { ifPresent: ['CI'], ifNotPresent: ['BE'], replace: { CI: 'BE' } },
        { ifPresent: ['CCPA'], ifNotPresent: ['FG'], replace: { CCPA: 'FG' } },
        { ifPresent: ['ELTFI'], ifNotPresent: ['RFI'], replace: { ELTFI: 'RFI' } },
        { ifPresent: ['EPI'], ifNotPresent: ['TI'], replace: { EPI: 'TI' } },
        { ifPresent: ['FCE'], ifNotPresent: ['CI'], replace: { FCE: 'CI' } },
        { ifPresent: ['MC'], ifNotPresent: ['SPY'], replace: { MC: 'SPY' } },
        { ifPresent: ['SI'], ifNotPresent: ['PANA'], replace: { SI: 'PANA' } },
        { ifPresent: ['TP'], ifNotPresent: ['GGIT'], replace: { TP: 'GGIT' } },
    ],

    // Gasoline
    GOL: [
        { ifPresent: ['DOIET'], ifNotPresent: ['GI'], replace: { DOIET: 'GI' } },
        { ifPresent: ['ELTFI'], ifNotPresent: ['DOIET'], replace: { ELTFI: 'DOIET' } },
        { ifPresent: ['EEGI'], ifNotPresent: ['EPI'], replace: { EEGI: 'EPI' } },
        { ifPresent: ['EPI'], ifNotPresent: ['SC'], replace: { EPI: 'SC' } },
        { ifPresent: ['GGIT'], ifNotPresent: ['SL'], replace: { GGIT: 'SL' } },
        { ifPresent: ['JNII'], ifNotPresent: ['SY'], replace: { JNII: 'SY' } },
        { ifPresent: ['LAT'], ifNotPresent: ['FG'], replace: { LAT: 'FG' } },
        { ifPresent: ['MC'], ifNotPresent: ['SDT'], replace: { MC: 'SDT' } },
        { ifPresent: ['PANA'], ifNotPresent: ['CI'], replace: { PANA: 'CI' } },
        { ifPresent: ['SI'], ifNotPresent: ['FCE'], replace: { SI: 'FCE' } },
        { ifPresent: ['SY'], ifNotPresent: ['TT'], replace: { SY: 'TT' } },
    ],

    // Horse Semen
    HS: [
        { ifPresent: ['AG'], ifNotPresent: ['CI'], replace: { AG: 'CI' } },
        { ifPresent: ['GGIT'], ifNotPresent: ['RFI'], replace: { GGIT: 'RFI' } },
        { ifPresent: ['SUIDI'], ifNotPresent: ['EEGI'], replace: { SUIDI: 'EEGI' } },
        { ifPresent: ['TP'], ifNotPresent: ['ELTFI'], replace: { TP: 'ELTFI' } },
    ],

    // Iodine
    ID: [
        { ifPresent: ['CI'], ifNotPresent: ['BI'], replace: { CI: 'BI' } },
        { ifPresent: ['CD'], ifNotPresent: ['GGIT'], replace: { CD: 'GGIT' } },
        { ifPresent: ['EPI'], ifNotPresent: ['SUIDI'], replace: { EPI: 'SUIDI' } },
        { ifPresent: ['FG'], ifNotPresent: ['PANA'], replace: { FG: 'PANA' } },
        { ifPresent: ['RFI'], ifNotPresent: ['TP'], replace: { RFI: 'TP' } },
        { ifPresent: ['TI'], ifNotPresent: ['SY'], replace: { TI: 'SY' } },
    ],

    // Mega Bean
    MB: [
        { ifPresent: ['ALI'], ifNotPresent: ['LAT'], replace: { ALI: 'LAT' } },
        { ifPresent: ['CI'], ifNotPresent: ['GI'], replace: { CI: 'GI' } },
        { ifPresent: ['EEGI'], ifNotPresent: ['CCPA'], replace: { EEGI: 'CCPA' } },
        { ifPresent: ['FCE'], ifNotPresent: ['DOIET'], replace: { FCE: 'DOIET' } },
        { ifPresent: ['JNII'], ifNotPresent: ['PANA'], replace: { JNII: 'PANA' } },
        { ifPresent: ['SUIDI'], ifNotPresent: ['FCE'], replace: { SUIDI: 'FCE' } },
        { ifPresent: ['SI'], ifNotPresent: ['ELTFI'], replace: { SI: 'ELTFI' } },
        { ifPresent: ['SPY'], ifNotPresent: ['TI'], replace: { SPY: 'TI' } },
        { ifPresent: ['SY'], ifNotPresent: ['CI'], replace: { SY: 'CI' } },
        { ifPresent: ['TP'], ifNotPresent: ['EEGI'], replace: { TP: 'EEGI' } },
    ],

    // Motor Oil
    MO: [
        { ifPresent: ['EEGI'], ifNotPresent: ['MC'], replace: { EEGI: 'MC' } },
        { ifPresent: ['EPI'], ifNotPresent: ['SDT'], replace: { EPI: 'SDT' } },
        { ifPresent: ['FG'], ifNotPresent: ['TI'], replace: { FG: 'TI' } },
        { ifPresent: ['MC'], ifNotPresent: ['SZPN'], replace: { MC: 'SZPN' } },
        { ifPresent: ['PANA'], ifNotPresent: ['AG'], replace: { PANA: 'AG' } },
    ],

    // Mouth Wash
    MW: [
        { ifPresent: ['CI'], ifNotPresent: ['AG'], replace: { CI: 'AG' } },
        { ifPresent: ['CD'], ifNotPresent: ['SY'], replace: { CD: 'SY' } },
        { ifPresent: ['EPS'], ifNotPresent: ['SDT'], replace: { EPS: 'SDT' } },
        { ifPresent: ['FCE'], ifNotPresent: ['JNII'], replace: { FCE: 'JNII' } },
    ],

    // Paracetamol
    PRCTM: [
        { ifPresent: ['CI'], ifNotPresent: ['SPY'], replace: { CI: 'SPY' } },
        { ifPresent: ['ELTFI'], ifNotPresent: ['ALI'], replace: { ELTFI: 'ALI' } },
        { ifPresent: ['EEGI'], ifNotPresent: ['PANA'], replace: { EEGI: 'PANA' } },
        { ifPresent: ['FCE'], ifNotPresent: ['GGIT'], replace: { FCE: 'GGIT' } },
        { ifPresent: ['FG'], ifNotPresent: ['CI'], replace: { FG: 'CI' } },
        { ifPresent: ['GI'], ifNotPresent: ['TI'], replace: { GI: 'TI' } },
        { ifPresent: ['MC'], ifNotPresent: ['AG'], replace: { MC: 'AG' } },
        { ifPresent: ['PANA'], ifNotPresent: ['BI'], replace: { PANA: 'BI' } },
        { ifPresent: ['SC'], ifNotPresent: ['BE'], replace: { SC: 'BE' } },
        { ifPresent: ['TI'], ifNotPresent: ['TT'], replace: { TI: 'TT' } },
    ],

    // Viagra
    VAR: [
        { ifPresent: ['ALI'], ifNotPresent: ['SY'], replace: { ALI: 'SY' } },
        { ifPresent: ['DOIET'], ifNotPresent: ['TI'], replace: { DOIET: 'TI' } },
        { ifPresent: ['EPI'], ifNotPresent: ['BE'], replace: { EPI: 'BE' } },
        { ifPresent: ['LAT'], ifNotPresent: ['CI'], replace: { LAT: 'CI' } },
        { ifPresent: ['SI'], ifNotPresent: ['GGIT'], replace: { SI: 'GGIT' } },
    ],
};

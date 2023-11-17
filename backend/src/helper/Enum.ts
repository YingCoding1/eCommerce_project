export enum StatusEnum {
    RECEIVED = "received",
    PENDING = "pending",
    SHIPPED = "shipped",
    CANCELLED = "cancelled",
    DELIVERED = "delivered"
}

export enum ProvinceEnum {
    AB = "Alberta",
    BC = "British Columbia",
    MB = "Manitoba",
    NB = "New Brunswick",
    NL = "Newfoundland and Labrador",
    NT = "Northwest Territories",
    NS = "Nova Scotia",
    NU = "Nunavut",
    ON = "Ontario",
    PE = "Prince Edward Island",
    QC = "Quebec",
    SA = "Saskatchewan",
    YT = "Yukon Territory",
}

export enum PaymentEnum {
    PENDING = "pending",
    COMPLETE = "complete",
    REFUNDED = "refunded",
    FAILED = "failed",
    CANCELLED = "cancelled"
}

export enum TypeEnum {
    PAYPAL = "paypal",
    CARD = "credit card",
    WECHAT = "wechat",
    APPLE = "apple pay",
    STRIPE = "stripe"
}
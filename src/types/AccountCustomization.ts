export interface AccountCustomization {
    nickname?: string;
    color?: string;
    emoji?: string;
    nftPfpId?: string;
    nftPfpUrl?: string;
    invalidPackages?: {
        invalidPackageAdditions: string[];
        invalidPackageSubtractions: string[];
    };
}

export interface AccountCustomizationWithAddress extends AccountCustomization {
    address: string;
    publicKey: string | null;
}

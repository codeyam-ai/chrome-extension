import CustomizeNavigation from './dapps/Customize/CustomizeNavigation';
import addressBookIcon from '_src/ui/assets/images/dappIcons/address-book.png';
import customizeIcon from '_src/ui/assets/images/dappIcons/customize.png';
export interface DappData {
    image: string;
    name: string;
    url?: string;
    component?: React.ComponentType;
    route?: string;
    isFavorite: boolean;
}

export const sampleData: DappData[] = [
    {
        image: customizeIcon,
        name: 'Customize',
        component: CustomizeNavigation,
        route: 'customize',
        isFavorite: true,
    },
    {
        image: addressBookIcon,
        name: 'Address Book',
        component: CustomizeNavigation,
        route: 'address-book',
        isFavorite: true,
    },
    // {
    //     image: 'https://via.placeholder.com/150/1',
    //     name: 'localhost:3000/',
    //     url: 'http://localhost:3000/',
    //     isFavorite: true,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/1',
    //     name: 'Ethos Example App',
    //     url: 'https://ethos-example-app.onrender.com/',
    //     isFavorite: true,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/3',
    //     name: 'Sui8192',
    //     url: 'https://ethoswallet.github.io/Sui8192/mobile',
    //     isFavorite: true,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/2',
    //     name: 'Keepsake',
    //     url: 'https://keepsake.gg/',
    //     isFavorite: false,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/4',
    //     name: 'Item 4',
    //     url: 'https://www.example.com/item4',
    //     isFavorite: true,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/5',
    //     name: 'Item 5',
    //     url: 'https://www.example.com/item5',
    //     isFavorite: false,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/6',
    //     name: 'Item 6',
    //     url: 'https://www.example.com/item6',
    //     isFavorite: true,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/7',
    //     name: 'Item 7',
    //     url: 'https://www.example.com/item7',
    //     isFavorite: false,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/8',
    //     name: 'Item 8',
    //     url: 'https://www.example.com/item8',
    //     isFavorite: false,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/9',
    //     name: 'Item 9',
    //     url: 'https://www.example.com/item9',
    //     isFavorite: false,
    // },
    // {
    //     image: 'https://via.placeholder.com/150/10',
    //     name: 'Item 10',
    //     url: 'https://www.example.com/item10',
    //     isFavorite: false,
    // },
];

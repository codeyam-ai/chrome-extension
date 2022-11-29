import { fakeBrowser } from '_src/test/utils/fake-browser';

export const simulateAuthenticatedUser = async function () {
    await fakeBrowser.storage.local.set({
        f7409e40f148e2b9ce97:
            '{"encryptedText":"f4126b7dd11ee22b1d58e6707e4c5e3d4074","saltString":"e7fce231b811f0937403365fc37d29ca","nonceString":"d83c6161a6468af03bdd870be2877ac0"}',
    });
    await fakeBrowser.storage.local.set({
        '9d87d62babd5e5bc':
            '{"encryptedText":"46968be747717a7c87af5735da302dfe3ed7d8db637d82762387cf0a193a2e23b03b94affa0464dc0ede49c495d4b2ee41a476ff1c6fbc6dc058e932ed81b9f7e3ccbb6f48a22e634770c92950cb0d7cdf4fb19b479aa44972a4524ad301b362089bc3a2","saltString":"2ef81475a9312caacbab6ecfeea8c816","nonceString":"071d16af25a8d93bd0d473097613d1b8"}',
    });
    await fakeBrowser.storage.local.set({
        '918ad029b1d5f896a937cf34':
            '{"encryptedText":"13bd1b19a4dfa5234ba5b36db656e1216c978ea700e7a9c7c7a10d00e4af24fd6149c3946711516767742e3aa686b52d0cc7b553932b9b69818ddd4911b7ecd38cf66cc7e6d0ec3714d3bfd036c8cb1c64c595e4b591e8ec22e4ba16e368ac9a628bd51d5207b003356d92eb2cacf4cfc1d7cfb34ee6ed51a96f48ddef0ce690758883dfcd2d829cb7a20ede373a3defbf12c26c7ce2b49b5eb10573e4d2b69b657d030e60106b9c48b27959bfb3e0724d1b9098aced73f4bd17447c5d145752c8ac5b5b58f3699755a45e6ceeeead866ced34209dac82375bb53204763bc2cd6ee4da5f3e208dfbd5fd989dd8764a0a5bac860e965bbe12830968ced9e6f1f3c6093378e2d64454bc1f926a0673aedf12140f6010ee4d9e103a8d4c8c0c1e19b5d42ecb95c89bec2da10fd3dbe01a7583e3c00e84c7b4c0be76d3f5ef7a439733c87a9cd06acbc48246532e59f0b925873859607074aee13e6bd0da56b24350c2","saltString":"025630aa4689b50a880beba7c3476c79","nonceString":"7b84988c00391644c10db323266153b5"}',
    });
    await fakeBrowser.storage.local.set({
        '9c86d02da1df':
            '{"encryptedText":"e4687365c6907443a7daae3966e98658e8ae963210754c83","saltString":"efca629a87f1519e79781e3712e732a2","nonceString":"9ce0eba7986ada833bcb4966721967c7"}',
    });
};

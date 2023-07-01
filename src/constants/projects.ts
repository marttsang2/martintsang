export type ProjectProps = {
    title: string,
    company: string,
    date: string,
    skills?: string[],
    description: string,
    url: string,
}

const projects: ProjectProps[] = [
    // {
    //     title: 'Jomud',
    //     description: 'Jomud is a web application that allows users to manage their accounts and transactions. It is built with React, TypeScript, and Firebase.',
    //     url: '',
    //     company: 'Asynk.ai',
    //     date: '2023',
    // },
    {
        title: 'Superacc',
        description: 'Superacc is designed for various financial institutions to streamline traditional banking process and conduct credit analysis on the bank statements',
        url: 'superacc.ai',
        company: 'Apoidea',
        date: '2022',
    },
    {
        title: 'Zwap',
        description: 'Zwap is a student loan platform that allows students to apply for loans and manage their accounts',
        url: 'platform.zwap.hk',
        company: 'P L Technology Limited',
        date: '2021',
    },
    {
        title: 'PewPewMall',
        description: 'PewPewMall is an e-commerce website that allows users to buy products',
        url: 'pewpewmall.com.hk',
        company: 'Technine',
        date: '2021',
    }
]

export default projects
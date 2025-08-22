
export const sample_foods: any[] = [
    {
        id: '1',
        name: 'Pizza',
        price: 10,
        tags: ['FastFood', 'Pizza'],
        favorite: true,
        stars: 4.5,
        imageUrl: '/assets/food1.jpeg',
        origins: ['Italy'],
        cookTime: '40-50'
    },
    {
        id: '2',
        name: 'Burger',
        price: 8,
        tags: ['FastFood', 'Burger'],
        favorite: false,
        stars: 4.0,
        imageUrl: '/assets/food2.jpg',
        origins: ['USA'],
        cookTime: '20-30'
    },
    {
        id: '3',
        name: 'Sushi',
        price: 15,
        tags: ['Asian', 'Sushi'],
        favorite: true,
        stars: 4.8,
        imageUrl: '/assets/food3.jpg',
        origins: ['Japan'],
        cookTime: '30-40'
    },
    {
    id: '4',
    name: 'Pasta',
    price: 12,
    tags: ['Italian', 'Pasta'],
    favorite: false,
    stars: 4.2,
    imageUrl: '/assets/food4.jpg',
    origins: ['Italy'],
    cookTime: '25-35'
    }  , 

{
    id: '5',
    name: 'Salad',
    price: 7,
    tags: ['Healthy', 'Salad'],
    favorite: false,
    stars: 4.1,
    imageUrl: '/assets/food5.jpg',
    origins: ['Greece'],
    cookTime: '10-15'
},
{
    id: '6',
    name: 'Tacos',
    price: 9,
    tags: ['Mexican', 'Tacos'],
    favorite: true,
    stars: 4.6,
    imageUrl: '/assets/food6.jpg',
    origins: ['Mexico'],
    cookTime: '15-20'
} ,
{
    id: '7',
    name: 'Veggie Pizza',
    price: 20,
    tags: ['Viggie', 'Pizza'],
    favorite: true,
    stars: 4.9,
    imageUrl: '/assets/food7.jpg',
    origins: ['Italy'],
    cookTime: '40-60'
} 
];

export const sample_tags: any[] =  [
      { name: 'All', count: 14 },
      { name: 'FastFood', count: 4 },
      { name: 'Pizza', count: 2 },
      { name: 'Italian', count: 3 },
      { name: 'Asian', count: 2 },
      { name: 'Burger', count: 1 },
      { name: 'Mexican', count: 1 },
      { name: 'Healthy', count: 1 },
    ];

export const sample_users: any[] = [
    {
        name: "John Doe",
        email: "john@gmail.com", 
        password:"12345",
        address: "123 Main St, Springfield",
        isAdmin: false,
    },
    {
        name: "Jane Smith",
        email: "jane@gmail.com",
        password:"123456789",
        address: "456 Elm St, Springfield",
        isAdmin: true,
    }
    ]
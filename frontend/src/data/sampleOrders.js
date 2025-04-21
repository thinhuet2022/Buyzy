export const sampleOrders = Array.from({length: 25}, (_, index) => ({
    id: `ORD-${(index + 1).toString().padStart(5, '0')}`,
    date: new Date(2024, 0, index + 1).toISOString(),
    status: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'][Math.floor(Math.random() * 5)],
    total: Math.round(Math.random() * 1000 * 100) / 100,
    items: [
        {
            name: 'Wireless Headphones',
            quantity: Math.floor(Math.random() * 3) + 1,
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            name: 'Smart Watch',
            quantity: Math.floor(Math.random() * 2) + 1,
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            name: 'Bluetooth Speaker',
            quantity: Math.floor(Math.random() * 2) + 1,
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    shipping: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        address: '123 Main Street',
        ward: 'Ward 1',
        district: 'District 1',
        province: 'Province 1'
    },
    payment: {
        method: Math.random() > 0.5 ? 'cod' : 'vnpay',
        status: 'COMPLETED'
    }
}));
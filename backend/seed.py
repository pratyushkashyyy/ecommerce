from app import create_app, db
from models import Product

app = create_app()

toys = [
    {
        "name": "Lego Space Shuttle",
        "description": "Build your own space shuttle with this detailed Lego set. Includes astronaut minifigures.",
        "price": 49.99,
        "image_url": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
        "category": "Construction",
        "stock": 50
    },
    {
        "name": "Plush Teddy Bear",
        "description": "Soft and cuddly teddy bear, perfect for hugs. 12 inches tall.",
        "price": 19.99,
        "image_url": "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?auto=format&fit=crop&w=800&q=80",
        "category": "Plush",
        "stock": 100
    },
    {
        "name": "Remote Control Car",
        "description": "High-speed remote control car with rechargeable battery. Off-road capabilities.",
        "price": 34.99,
        "image_url": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80",
        "category": "Electronics",
        "stock": 30
    },
    {
        "name": "Wooden Building Blocks",
        "description": "Classic wooden building blocks set. 50 pieces of various shapes and colors.",
        "price": 24.99,
        "image_url": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
        "category": "Construction",
        "stock": 75
    },
    {
        "name": "Action Figure Hero",
        "description": "Poseable action figure with accessories. 6 inches tall.",
        "price": 14.99,
        "image_url": "https://images.unsplash.com/photo-1608354580875-30bd4168b351?auto=format&fit=crop&w=800&q=80",
        "category": "Action Figures",
        "stock": 60
    },
    {
        "name": "Dollhouse Set",
        "description": "Two-story dollhouse with furniture and miniature family figures.",
        "price": 89.99,
        "image_url": "https://images.unsplash.com/photo-1513883049090-d0b7439f4904?auto=format&fit=crop&w=800&q=80",
        "category": "Dolls",
        "stock": 20
    },
    {
        "name": "Educational Puzzle",
        "description": "100-piece puzzle featuring a map of the world. Great for learning geography.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1587654780291-39c940483713?auto=format&fit=crop&w=800&q=80",
        "category": "Educational",
        "stock": 150
    },
    {
        "name": "Toy Kitchen Set",
        "description": "Complete toy kitchen with pots, pans, and play food. Realistic sounds.",
        "price": 59.99,
        "image_url": "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
        "category": "Role Play",
        "stock": 25
    },
    {
        "name": "Art Supplies Kit",
        "description": "Includes crayons, markers, colored pencils, and a sketchbook.",
        "price": 29.99,
        "image_url": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
        "category": "Arts & Crafts",
        "stock": 80
    },
    {
        "name": "Board Game Classic",
        "description": "Fun for the whole family. Strategy and luck combined.",
        "price": 22.99,
        "image_url": "https://images.unsplash.com/photo-1610890716171-6b1c9f2bd40c?auto=format&fit=crop&w=800&q=80",
        "category": "Games",
        "stock": 40
    },
    {
        "name": "Robot Dog",
        "description": "Interactive robot dog that barks, walks, and responds to touch.",
        "price": 44.99,
        "image_url": "https://images.unsplash.com/photo-1535378437323-9555f3e7f5bb?auto=format&fit=crop&w=800&q=80",
        "category": "Electronics",
        "stock": 35
    },
    {
        "name": "Dinosaur Figure",
        "description": "Realistic T-Rex dinosaur figure. Roaring sound effect.",
        "price": 17.99,
        "image_url": "https://images.unsplash.com/photo-1570473633763-269776472d39?auto=format&fit=crop&w=800&q=80",
        "category": "Action Figures",
        "stock": 90
    }
]

with app.app_context():
    db.create_all()
    # Check if products exist
    if Product.query.count() == 0:
        for toy_data in toys:
            toy = Product(**toy_data)
            db.session.add(toy)
        db.session.commit()
        print("Database seeded successfully!")
    else:
        print("Database already contains products.")

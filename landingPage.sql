-- Table for Services
CREATE TABLE Services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL
);

-- Table for Pricing Plans
CREATE TABLE PricingPlans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    link TEXT NOT NULL
);

-- Table for Features associated with Pricing Plans
CREATE TABLE Features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    feature TEXT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES PricingPlans (id) ON DELETE CASCADE
);

-- Table for Testimonials
CREATE TABLE Testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    logo TEXT NOT NULL,
    alt TEXT NOT NULL,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    position TEXT NOT NULL
);

-- Table for Client Logos (if separate from Testimonials)
CREATE TABLE ClientLogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    logo TEXT NOT NULL,
    alt TEXT NOT NULL
);

import "./About.css"
import { DynamicPageHeader } from "../components/DynamicPageHeader"
import { MainLayout } from "../layouts/MainLayout"


export const About = () => {
    return (
        <MainLayout>
            <DynamicPageHeader header="About BCard" />
            <div className="about-container">
                <h2>Welcome to BCard!</h2>
                <p>
                    BCard is a web application designed to help businesses and individuals manage and share business cards online.
                    Whether you're a business owner, a freelancer, or just looking to organize your contacts, BCard makes it easy and efficient.
                </p>

                <h3>What can you do here?</h3>
                <ul>
                    <li><strong>Browse Cards:</strong> View business cards shared by others.</li>
                    <li><strong>Favorites:</strong> Save cards to your favorites list (for logged-in users).</li>
                    <li><strong>Create & Edit:</strong> As a business user, you can create, edit, or delete your own business cards.</li>
                    <li><strong>Admin Panel:</strong> Admin users have extended access to manage all cards.</li>
                </ul>

                <h3>Roles & Permissions:</h3>
                <ul>
                    <li><strong>Guest:</strong> Can view public business cards.</li>
                    <li><strong>Regular User:</strong> Can also save favorite cards.</li>
                    <li><strong>Business:</strong> Can manage their own cards (CRUD).</li>
                    <li><strong>Admin:</strong> Full control of the system.</li>
                </ul>

                <p>
                    We hope you enjoy using BCard. If you have any questions, feel free to reach out to our support team.
                </p>
            </div>
        </MainLayout>
    );
};
import Hero from "../Components/Hero/Hero";
import Nav from "../Components/Nav/Nav";
import Packages from "../Components/Packages/Packages";
import TaskSection from "../Components/TaskSection/TaskSection";
import Questions from "../Components/User/Questions/Questions";

const HomeLayout = () => {
    return (
        <div>
            <section>
                <Hero />
            </section>
            <section className="task-section">
                <TaskSection></TaskSection>
            </section>
            <section >
                <Packages />
            </section>
        </div>
    );
};

export default HomeLayout;
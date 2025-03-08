import Footer from "./Footer";
import Testimonials from "./Testimonials";
import BookSession from "./BookSession";
import Procedure from "./Procedure";
import Services from "./Services";
import Index from "./Index";




export default function WebLayout(){
    return(
        <div className="layout scroll-smooth">
            <Index />
            <Services />
            <Procedure/>
            <BookSession />
            <Testimonials />
            <Footer />
        </div>
    )
}




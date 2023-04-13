import { Link } from "react-router-dom";
import "./event.css";
import miel from"./miel.png"
function Event({course}){
    return(<>
      <Link to={`/coursedetail/${course._id}`} key={course._id} >

    <div className="grid">
    <div className="card">
      <div className="card__image">
        <img src={`${process.env.PUBLIC_URL}/images/${course.thumbnailCourse}`} alt="">
</img>
        <div className="card__overlay card__overlay--blue">
          <div className="card__overlay-content">
            <ul className="card__meta">
              <li><a href="#0"><i className="fa fa-tag"></i> {course.category}</a></li>
              <li><a href="#0"><i className="fa fa-clock-o"></i> 22 nov</a></li>
            </ul>

            <a href="#0" className="card__title"> {course.titleCourse}</a>

            <ul className="card__meta card__meta--last">
              <li><a href="#0"><i className="fa fa-user"></i> {course?.coach?.firstName}</a></li>
              <li><a href="#0"><i className="fa fa-facebook-square"></i> Share</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</div> </Link> </>)
}
export default Event;
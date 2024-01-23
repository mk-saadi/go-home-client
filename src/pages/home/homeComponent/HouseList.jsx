import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const HouseList = ({ houses }) => {
	return (
		<div className="py-2 mx-3 border-t md:px-8 md:mx-auto xl:max-w-6xl lg:max-w-5xl md:max-w-4xl border-amber-900/30">
			<Fade
				cascade
				triggerOnce
				damping={0.5}
			>
				{houses.map((ha) => (
					<Link
						key={ha._id}
						className="flex justify-start gap-x-2.5 my-1.5 px-2 py-2.5 border-y border-amber-900/15 bg-white  duration-200 hover:bg-amber-50 group"
						to={`/${ha._id}`}
					>
						<div className="overflow-hidden">
							<img
								src={ha.imageUrls[0]}
								alt=""
								className="object-cover duration-700 h-28 w-36 group-hover:scale-110"
							/>
						</div>

						<div>
							<p className="text-base font-semibold text-gray-700">{ha.houseName}</p>
							<p className="text-sm font-medium text-gray-500">{ha.city}</p>
							<p className="text-sm font-medium text-gray-500">BDT: ৳{ha.rent}</p>
							<p className="text-sm font-medium text-gray-500">
								Available from: {ha.availability}
							</p>
						</div>
					</Link>
				))}
			</Fade>
		</div>
	);
};

export default HouseList;

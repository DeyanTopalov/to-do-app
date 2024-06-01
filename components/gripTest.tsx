// "use client";
// import { Reorder, useDragControls, useMotionValue } from "framer-motion";
// import { useState } from "react";
// import { Grip } from "lucide-react";

// const GripTest = () => {
//   // const y = useMotionValue(0);
//   const [items, setItems] = useState([0, 1, 2, 3]);
//   const controlsArray = items.map(() => useDragControls());

//   return (
//     <div className="mt-10 h-80 w-80 rounded-md bg-slate-600 p-2">
//       <Reorder.Group
//         axis="y"
//         values={items}
//         onReorder={setItems}
//         className="grid gap-3"
//       >
//         {items.map((item, index) => (
//           <Reorder.Item
//             key={item}
//             value={item}
//             // style={{ y }}
//             dragListener={false}
//             // dragControls={controls}
//             className="touch-control"
//             dragControls={controlsArray[index]}
//           >
//             {/* <div onPointerDown={(e) => controlsArray[index].start(e)}>
//               <Grip className="h-6 w-6 bg-green-700" />
//             </div> */}
//             <div className="flex w-full items-center justify-between gap-5 bg-blue-600">
//               <div onPointerDown={(e) => controlsArray[index].start(e)}>
//                 <Grip className="h-6 w-6 bg-green-700" />
//               </div>
//               {item}
//             </div>
//           </Reorder.Item>
//         ))}
//       </Reorder.Group>
//     </div>
//   );
// };

// export default GripTest;

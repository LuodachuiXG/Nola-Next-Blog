/**
 * 模糊背景色组件（用于暗色模式时的背景色）
 */
export default function BlurColorBackground() {
  return (
    <div className="absolute transition-opacity duration-[1600ms] ease-out left-0 top-0 size-full z-0 opacity-0 dark:opacity-35">
      {/*右上角*/}
      <div
        className="absolute top-48 -left-48 w-[200%] h-1/2 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl rotate-[20deg] blur-3xl"></div>
      <div
        className="absolute w-[200%] h-1/2 top-40 bg-gradient-to-b from-violet-600 to-fuchsia-500 rounded-2xl rotate-45 blur-3xl"></div>

      {/*左下角*/}
      <div
        className="absolute w-1/2 h-2/6 -bottom-48 -left-72 bg-gradient-to-b from-yellow-300 to-red-500 rounded-2xl rotate-[55deg] blur-3xl"></div>
    </div>
  );
}

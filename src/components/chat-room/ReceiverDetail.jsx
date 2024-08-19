export default function ReceiverDetail({ receiver }) {
    return <div id="userDetail" className="h-[10%] bg-white grid grid-cols-12 gap-1">
        <div className="profile w-[90%] h-[90%] m-1 col-span-1">
            <img src={receiver.profile} alt="" className="rounded-[50%] text-center bg-bggreen w-[90%] h-[90%]" />
        </div>
        <div className="flex items-center col-span-11">
            <h6 className="font-medium text-2xl col-span-11">{receiver.name}</h6>
        </div>
    </div>
}
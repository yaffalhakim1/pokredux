import { LoadingIcon } from "@/components/icons";
import { Ptbox } from "@/components/box";
import { AppDispatch } from "@/redux/store";
import { fetchPt } from "@/redux/store/pt/ptSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface pt {
  nama_pt?: string;
  id_sp?: any;
}

export default function PT(props: pt) {
  const dispatch = useDispatch<AppDispatch>();
  const ptStatus = useSelector((state: any) => state.pt.status);
  const pts = useSelector((state: any) => state.pt.data);
  const error = useSelector((state: any) => state.pt.error);

  useEffect(() => {
    if (ptStatus === "idle") {
      dispatch(fetchPt());
    }
  }, [ptStatus, dispatch]);

  let pt;
  if (ptStatus === "loading") {
    pt = (
      <div className="flex items-center justify-center">
        <LoadingIcon />
      </div>
    );
  } else if (ptStatus === "succeeded") {
    pt = pts.map((pt: any) => (
      <div key={pt.id_sp}>
        <Ptbox nama_pt={pt.nama_pt} id_sp={pt.id_sp} />
      </div>
    ));
  } else if (ptStatus === "failed") {
    pt = <div className=" text-xl">{error}</div>;
  }
  return (
    <>
      <h1 className="text-center text-2xl mt-5 mb-5">Perguruan Tinggi</h1>
      <div className="md:mx-[80px] mx-5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {pt}
      </div>
    </>
  );
}

<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';
$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();
$fallaequipo='';
while (!empty($data->fallaequipo)) {
	if(empty($fallaequipo))
	{
		$fallaequipo=array_shift($data->fallaequipo);
	}else
	{
		$fallaequipo=$fallaequipo." | ".array_shift($data->fallaequipo);
	}
}
$sql="INSERT INTO facturas (cliente,ci,tlf,cel,equipo,otro,modelo,codigo,bateria,sim,tapa,reclama_garantia,otros,estado_carcasa,estado_pantalla,falla_estatus,total,abono,resta,falla_equipo) VALUES ('".$data->cliente."','".$data->ci."','".$data->telefono."','".$data->cel."','".$data->equipo."','".$data->otro."','".$data->modelo."','".$data->serial."','".$data->bateria."','".$data->sim."','".$data->tapa."','".$data->garantia."','".$data->otros."','".$data->carcasaestatus."','".$data->pantallaestatus."','".$data->fallaestatus."','".$data->total."','".$data->abono."','".($data->total-$data->abono)."','".$fallaequipo."')";
$respon=$bd->ejecutar($sql);

$sql="SELECT id_orden,create_date FROM facturas WHERE id_orden='".mysql_insert_id()."'";
$respon2=$bd->ejecutar($sql);
$x=$bd->obtener_fila($respon2,0);
if($respon){
$array['mensaje']= "success";
$array['id']=$x['id_orden'];
$fecha= new DateTime($x['create_date']);
$array['fecha']=$fecha->format('d-M-Y');
}
else
$array['mensaje']= "failed";
echo json_encode($array);
 ?>
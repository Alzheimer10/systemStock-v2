<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';

$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();
$sql="DELETE FROM facturas WHERE id_orden='".$data->id."'";
$respon=$bd->ejecutar($sql);

($respon)?$array['mensaje']= "success":$array['mensaje']= "failed";

echo json_encode($array);
 ?>
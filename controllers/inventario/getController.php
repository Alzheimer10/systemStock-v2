<?php 

include_once '../../DBconexion/DB.class.php';
/*Incluimos el fichero de la clase Conf*/
include_once '../../DBconexion/Conf.class.php';

$data = json_decode(file_get_contents("php://input"));
$bd=Db::getInstance();
$sql="SELECT * FROM inventario";
$respon=$bd->ejecutar($sql);
if($respon)
{
	while($x=$bd->obtener_fila($respon,0))
	{
		$item= array('id' => $x['id'],
		             'name'=> $x['name'],
		             'price'=>intval($x['price']),
		             'mount'=>intval($x['mount'])
		             );
		$arrayItems[]=$item;
	}
	$array['data']=$arrayItems;
	$array['mensaje']= "success";
}
else
{
$array['mensaje']= "failed";
}
echo json_encode($array);
 ?>
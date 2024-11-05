/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { provincias, tipo_clientes } from "../../data/data";
import { postData, putData } from "../../service/apiService";

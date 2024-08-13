-- 1)	Mostrar los nombres de los empleados ordenados alfabéticamente (Z...A)
        SELECT NOMBRES FROM EMPLEADOS ORDER BY NOMBRES DESC;

-- 2)	Seleccionar el nombre, el puesto y la localidad donde trabajan los empleados con puesto de ‘Soporte’.
        SELECT e.APELLIDO, p.PUESTO, l.LOCALIDAD
        FROM EMPLEADOS e
        INNER JOIN FK_PUESTOS_EMPLEADOS pe ON e.ID = pe.PUESTO_ID
        INNER JOIN PUESTOS p ON pe.PUESTO = p.PUESTO
        INNER JOIN FK_LOCALIDADES_DEPARTAMENTOS ld ON e.DEPARTAMENTO_ID = ld.LOCALIDAD_ID
        INNER JOIN LOCALIDADES l ON ld.LOCALIDAD_ID = l.ID
        WHERE p.PUESTO = 'Soporte'

-- 3)	Listar los nombres de los empleados cuyo nombre termine con la letra ‘o’.
        SELECT NOMBRES FROM EMPLEADOS WHERE NOMBRES LIKE '%o';

-- 4)	Seleccionar el nombre, el puesto y sueldo de los empleados que trabajan en la localidad Carlos Paz.
        SELECT e.APELLIDO, p.PUESTO, e.SUELDO
        FROM EMPLEADOS e
        INNER JOIN FK_PUESTOS_EMPLEADOS pe ON e.ID = pe.PUESTO_ID
        INNER JOIN PUESTOS p ON pe.PUESTO = p.PUESTO
        INNER JOIN FK_LOCALIDADES_DEPARTAMENTOS ld ON e.DEPARTAMENTO_ID = ld.LOCALIDAD_ID
        INNER JOIN LOCALIDADES l ON ld.LOCALIDAD_ID = l.ID
        WHERE l.LOCALIDAD = 'Carlos Paz'

-- 5)	Seleccionar el nombre, sueldo y localidad donde trabajan de los empleados que tengan un sueldo entre 10000 y 13000.
        SELECT e.APELLIDO, e.SUELDO, l.LOCALIDAD
        FROM EMPLEADOS e
        INNER JOIN FK_LOCALIDADES_DEPARTAMENTOS ld ON e.DEPARTAMENTO_ID = ld.LOCALIDAD_ID
        INNER JOIN LOCALIDADES l ON ld.LOCALIDAD_ID = l.ID
        WHERE e.SUELDO BETWEEN 10000 AND 13000

-- 6)	Visualizar los departamentos con más de 5 empleados
        SELECT d.DENOMINACION, COUNT(ed.ID) AS NUM_EMPLEADOS
        FROM DEPARTAMENTOS d
        INNER JOIN FK_EMPLEADOS_DEPARTAMENTOS ed ON d.ID = ed.DEPARTAMENTO_ID
        GROUP BY d.DENOMINACION
        HAVING COUNT(ed.ID) > 5

-- 7)	Nombre de los empleados que trabajan en Córdoba y cuyo puesto sea ‘Analista’ o ‘Programador’.
        SELECT e.APELLIDO
        FROM EMPLEADOS e
        INNER JOIN FK_PUESTOS_EMPLEADOS pe ON e.ID = pe.PUESTO_ID
        INNER JOIN PUESTOS p ON pe.PUESTO = p.PUESTO
        INNER JOIN FK_LOCALIDADES_DEPARTAMENTOS ld ON e.DEPARTAMENTO_ID = ld.LOCALIDAD_ID
        INNER JOIN LOCALIDADES l ON ld.LOCALIDAD_ID = l.ID
        WHERE l.LOCALIDAD = 'Córdoba' AND p.PUESTO IN ('Analista', 'Programador')

-- 8)	Calcula el sueldo medio de todos los empleados.
        SELECT AVG(SUELDO) AS SUELDO_MEDIO
        FROM EMPLEADOS

-- 9)	¿Cuál es el máximo sueldo de los empleados del departamento 10?
        SELECT MAX(e.SUELDO) AS SUELDO_MAXIMO
        FROM EMPLEADOS e
        INNER JOIN FK_EMPLEADOS_DEPARTAMENTOS ed ON e.ID = ed.ID
        WHERE ed.DEPARTAMENTO_ID = 10

-- 10)	Calcula el sueldo mínimo de los empleados del departamento ‘Soporte’.
        SELECT MIN(e.SUELDO) AS SUELDO_MINIMO
        FROM EMPLEADOS e
        INNER JOIN FK_EMPLEADOS_DEPARTAMENTOS ed ON e.ID = ed.ID
        INNER JOIN DEPARTAMENTOS d ON ed.DEPARTAMENTO_ID = d.ID
        WHERE d.DENOMINACION = 'Soporte'

-- 11)	Para cada puesto obtener la suma de sueldos.
        SELECT p.PUESTO, SUM(e.SUELDO) AS SUMA_SUELDOS
        FROM EMPLEADOS e
        INNER JOIN FK_PUESTOS_EMPLEADOS pe ON e.ID = pe.PUESTO_ID
        INNER JOIN PUESTOS p ON pe.PUESTO = p.PUESTO
        GROUP BY p.PUESTO
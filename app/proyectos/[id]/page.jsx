'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Container, Card, Button, Row, Col, Alert, Form, Modal } from 'react-bootstrap'
import Link from 'next/link' // Importa el componente Link de Next.js

const API_BASE_URL = 'http://localhost:3001'

export default function ProyectoDetallePage() {
    const { id } = useParams()
    const [proyecto, setProyecto] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [newTaskAssignedTo, setNewTaskAssignedTo] = useState('')
    const [loadingNewTask, setLoadingNewTask] = useState(false)
    const [newTaskError, setNewTaskError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)

    const [showEditModal, setShowEditModal] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [editFormTitle, setEditFormTitle] = useState('')
    const [editFormDescription, setEditFormDescription] = useState('')

    useEffect(() => {
        if (id) {
            fetchProyectoYTareas()
        }
    }, [id])

    const fetchProyectoYTareas = async () => {
        try {
            setLoading(true)
            const resProyecto = await fetch(`${API_BASE_URL}/projects/${id}`)
            if (!resProyecto.ok) throw new Error('Proyecto no encontrado')
            const dataProyecto = await resProyecto.json()
            setProyecto(dataProyecto)

            const resTasks = await fetch(`${API_BASE_URL}/tasks?projectId=${id}`)
            if (!resTasks.ok) throw new Error('Error al obtener las tareas')
            const dataTasks = await resTasks.json()
            setTasks(dataTasks)
        } catch (err) {
            setError(err.message || 'Error al obtener datos del servidor.')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = async (e) => {
        e.preventDefault()
        setLoadingNewTask(true)
        setNewTaskError(null)
        try {
            const newTask = {
                title: newTaskTitle,
                description: newTaskDescription,
                projectId: id,
                completed: false,
                assignedTo: newTaskAssignedTo || 'Sin asignar'
            }
            const res = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            })
            if (!res.ok) throw new Error('Error al crear la tarea.')
            const createdTask = await res.json()
            setTasks([...tasks, createdTask])
            setNewTaskTitle('')
            setNewTaskDescription('')
            setNewTaskAssignedTo('')
            setSuccessMessage('Tarea creada con éxito.')
        } catch (err) {
            setNewTaskError(err.message || 'Hubo un problema al crear la tarea.')
        } finally {
            setLoadingNewTask(false)
        }
    }

    const handleDeleteTask = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/tasks/${taskToDelete}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Error al eliminar la tarea.')
            setTasks(tasks.filter(t => t.id !== taskToDelete))
            setSuccessMessage('Tarea eliminada con éxito.')
        } catch (err) {
            setNewTaskError(err.message || 'Hubo un problema al eliminar la tarea.')
        } finally {
            setShowDeleteConfirm(false)
            setTaskToDelete(null)
        }
    }

    const handleToggleCompleted = async (taskId, currentStatus) => {
        try {
            const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !currentStatus }),
            })
            if (!res.ok) throw new Error('Error al actualizar el estado de la tarea.')
            setTasks(tasks.map(t => (t.id === taskId ? { ...t, completed: !currentStatus } : t)))
            setSuccessMessage('Estado de la tarea actualizado con éxito.')
        } catch (err) {
            setNewTaskError(err.message || 'Hubo un problema al actualizar la tarea.')
        }
    }

    const handleEditClick = (task) => {
        setTaskToEdit(task)
        setEditFormTitle(task.title)
        setEditFormDescription(task.description)
        setShowEditModal(true)
    }

    const handleSaveChanges = async (e) => {
        e.preventDefault()
        if (!taskToEdit) return

        try {
            const res = await fetch(`${API_BASE_URL}/tasks/${taskToEdit.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editFormTitle,
                    description: editFormDescription,
                }),
            })

            if (!res.ok) throw new Error('Error al actualizar la tarea.')

            const updatedTask = await res.json()
            setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)))
            setSuccessMessage('Tarea actualizada con éxito.')
            setShowEditModal(false)
            setTaskToEdit(null)
        } catch (err) {
            setNewTaskError(err.message || 'Hubo un problema al actualizar la tarea.')
        }
    }

    if (loading) return <Container className="mt-5 text-center">Cargando proyecto y tareas...</Container>
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>

    return (
        <Container className="my-5">
            {/* HERO PROYECTO */}
            <Card className="mb-5 text-center shadow-lg border-0" style={{ background: 'linear-gradient(135deg,#007bff,#6610f2)', color: 'white' }}>
                <Card.Body className="py-5">
                    <h1 className="fw-bold display-5">{proyecto.name}</h1>
                    <p className="lead">{proyecto.description}</p>
                    <Link href="/proyectos" passHref>
                        <Button variant="light">⬅ Volver a Proyectos</Button>
                    </Link>
                </Card.Body>
            </Card>

            {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}
            {newTaskError && <Alert variant="danger" onClose={() => setNewTaskError(null)} dismissible>{newTaskError}</Alert>}

            {/* FORMULARIO NUEVA TAREA */}
            <Row className="mb-5">
                <Col md={{ span: 8, offset: 2 }}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <h4 className="text-center mb-4 text-primary fw-bold">➕ Nueva Tarea</h4>
                            <Form onSubmit={handleCreateTask}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Título</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        required
                                        placeholder="Título de la tarea"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newTaskDescription}
                                        onChange={(e) => setNewTaskDescription(e.target.value)}
                                        required
                                        placeholder="Describe la tarea aquí..."
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Asignar a:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newTaskAssignedTo}
                                        onChange={(e) => setNewTaskAssignedTo(e.target.value)}
                                        placeholder="Nombre del usuario (opcional)"
                                    />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" size="lg" disabled={loadingNewTask}>
                                        {loadingNewTask ? 'Creando...' : 'Crear Tarea'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <hr />

            {/* LISTA DE TAREAS */}
            <h2 className="text-center mb-4 fw-bold text-secondary">📋 Tareas del Proyecto</h2>
            {tasks.length === 0 ? (
                <Alert variant="info" className="text-center shadow-sm">No hay tareas para este proyecto. ¡Crea una!</Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {tasks.map((task) => (
                        <Col key={task.id}>
                            <Card
                                className="h-100 shadow-sm border-0"
                                style={{
                                    backgroundColor: task.completed ? '#e6f7e6' : '#f0f4ff',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '' }}
                            >
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className={`mb-2 fw-bold ${task.completed ? 'text-success text-decoration-line-through' : 'text-primary'}`}>
                                        {task.title}
                                    </Card.Title>
                                    <Card.Text className="text-muted flex-grow-1">{task.description}</Card.Text>
                                    <small className="text-secondary fw-semibold">Asignada a: {task.assignedTo || 'Sin asignar'}</small>
                                    <div className="mt-auto d-flex justify-content-between align-items-center pt-3">
                                        <Button
                                            variant={task.completed ? 'success' : 'outline-primary'}
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleToggleCompleted(task.id, task.completed)}
                                        >
                                            {task.completed ? '✅ Completada' : 'Marcar como completada'}
                                        </Button>
                                        <div className="ms-auto d-flex">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEditClick(task)}
                                            >
                                                ✏️ Editar
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => {
                                                    setTaskToDelete(task.id)
                                                    setShowDeleteConfirm(true)
                                                }}
                                            >
                                                🗑 Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* MODAL DE EDICIÓN */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-secondary">✏️ Editar Tarea</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSaveChanges}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={editFormTitle}
                                onChange={(e) => setEditFormTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editFormDescription}
                                onChange={(e) => setEditFormDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* MODAL ELIMINACIÓN */}
            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">⚠ Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta tarea? Esta acción es irreversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteTask}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}